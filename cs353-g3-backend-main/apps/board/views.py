# -*- coding: utf-8 -*-
# Create your views here.
import datetime

from bson import ObjectId
from rest_framework.views import APIView

from utils.mongo import database
from base.response import APIResponse
from .utils import mongo_json, adaptive_sort


collection = database['test_col']


class BoardView(APIView):

    def get(self, request, *args, **kwargs):
        _id = kwargs.get('pk')
        # list
        if not _id:
            cursor = collection.find({'status': 1}, {'lanes': 0})
            data = mongo_json(cursor)
        # detail
        else:
            data = collection.find_one({'_id': ObjectId(_id)})
            data['_id'] = str(data['_id'])

        return APIResponse(data=data)

    def post(self, request, *args, **kwargs):
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        data = {'title': request.data.get('title'),
                'start_date': start_date[:10],
                'end_date': end_date[:10]
                }
        init_data = {'lanes': [],
                     'status': 1,
                     'create_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                     'update_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                     }
        data.update(init_data)

        collection.insert_one(data)

        return APIResponse(200)

    def put(self, request, *args, **kwargs):
        _id = request.data.pop('_id')
        update_data = request.data
        update_data['update_time'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),

        collection.update_one({'_id': ObjectId(_id)}, {"$set": request.data})

        return APIResponse(200)

    def delete(self, request, *args, **kwargs):
        _id = request.data.pop('_id')
        collection.update_one({'_id': ObjectId(_id)}, {"$set": {'status': 0}})

        return APIResponse(200)


class LaneView(APIView):

    # find the lanes
    @staticmethod
    def get_lanes(_id):
        board = collection.find_one({'_id': ObjectId(_id)})
        lanes = board.get('lanes')

        return lanes

    def post(self, request, *args, **kwargs):
        _id = request.data.pop('_id')
        lanes = self.get_lanes(_id)

        # append data to the lanes array and generate the id(index)
        lanes = adaptive_sort(lanes, target=-1, title=request.data.get('title'), cards=[])
        collection.update_one({'_id': ObjectId(_id)}, {"$set": {'lanes': lanes}})

        return APIResponse(200)

    def put(self, request, *args, **kwargs):
        _id = request.data.pop('_id')
        lane_id = request.data.get('lane_id')
        lanes = self.get_lanes(_id)

        change_type = request.data.get('change_type')
        if change_type == 'move':
            # move lane
            target = request.data.pop('target', None)
            if target is not None:
                adaptive_sort(lanes, lane_id, target)
        elif change_type == 'update':
            update_data = request.data.get('data')
            for i in lanes:
                if i['id'] == lane_id:
                    i.update(update_data)

        collection.update_one({'_id': ObjectId(_id)}, {"$set": {'lanes': lanes}})

        return APIResponse(200)

    def delete(self, request, *args, **kwargs):
        _id = request.data.get('_id')
        lanes = self.get_lanes(_id)

        lane_id = request.data.get('lane_id')
        lanes = adaptive_sort(lanes, source=lane_id)

        collection.update_one({'_id': ObjectId(_id)}, {"$set": {'lanes': lanes}})

        return APIResponse(200)


class CardView(APIView):

    @staticmethod
    # find the cards
    def get_lane(lanes, lane_id):
        lane = []
        for i in lanes:
            if i.get('id') == lane_id:
                lane = i

        return lane

    def post(self, request, *args, **kwargs):
        _id = request.data.get('_id')
        lane_id = request.data.get('lane_id')
        lanes = LaneView.get_lanes(_id)
        lane = self.get_lane(lanes, lane_id)
        cards = lane.get('cards')

        card_data = request.data.get('card')
        card_data.pop('id')

        adaptive_sort(cards, target=-1, **card_data)

        collection.update_one({'_id': ObjectId(_id)}, {"$set": {'lanes': lanes}})

        return APIResponse(200)

    def put(self, request, *args, **kwargs):
        _id = request.data.pop('_id')
        lanes = LaneView.get_lanes(_id)

        change_type = request.data.get('change_type')

        if change_type == 'move':
            source_lane_id = int(request.data.get('lane_id'))
            source_card_id = int(request.data.get('card_id'))
            target_lane_id = int(request.data.get('target_lane_id'))
            target_card_id = int(request.data.get('target_card_id'))

            # source_lane delete index-1
            source_cards = lanes[source_lane_id]['cards']
            card = source_cards.pop(source_card_id)
            card['id'] = str(target_card_id)
            for i in source_cards[source_card_id:]:
                i['id'] = str(int(i['id']) - 1)

            # target_lane add index+1
            target_cards = lanes[target_lane_id]['cards']
            for i in target_cards[target_card_id:]:
                i['id'] = str(int(i['id']) + 1)
            target_cards.insert(target_card_id, card)

        elif change_type == 'update':
            lane_id = int(request.data.get('lane_id'))
            data = request.data.get('data')
            card_id = int(data.pop('id'))
            if card_id:
                card = lanes[lane_id]['cards'][card_id]
                card.update(data)

        collection.update_one({'_id': ObjectId(_id)}, {"$set": {'lanes': lanes}})

        return APIResponse(200)

    def delete(self, request, *args, **kwargs):
        _id = request.data.get('_id')
        lane_id = request.data.get('lane_id')
        card_id = request.data.get('card_id')
        lanes = LaneView.get_lanes(_id)
        lane = self.get_lane(lanes, lane_id)
        cards = lane.get('cards')

        adaptive_sort(cards, source=card_id)

        collection.update_one({'_id': ObjectId(_id)}, {"$set": {'lanes': lanes}})

        return APIResponse(200)
