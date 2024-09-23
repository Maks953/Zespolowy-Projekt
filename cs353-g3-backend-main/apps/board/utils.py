# -*- coding: utf-8 -*-


def mongo_json(cursor):
    data = []
    for i in cursor:
        i.update({'_id': str(i['_id'])})
        data.append(i)

    return data


# 写一个算法
# 这个算法的作用，是排序，返回id
def adaptive_sort(lis, source=None, target=None, **kwargs):

    # move: if source > target: interval data + 1,   else interval data - 1
    if source is not None and target is not None:
        source = int(source)
        target = int(target)
        data = lis.pop(source)
        data['id'] = str(target)
        lis.insert(target, data)

        if source > target:
            for i in lis[target+1: source+1]:
                i['id'] = str(int(i.get('id', '0')) + 1)
        else:
            for i in lis[source: target]:
                i['id'] = str(int(i.get('id', '0')) - 1)

    # add: source=None,target=-1 => index = last_index+1
    elif target:
        index = '0'
        # have data
        if lis:
            index = str(int(lis[-1].get('id')) + 1)
        lis.append({'id': index, **kwargs})

    # delete: source=index, target=None => index of the behind data - 1
    elif source:
        source = int(source)
        lis.pop(source)
        # if there's data behind it
        if len(lis) > source:
            for i in lis[source:]:
                i['id'] = str(int(i.get('id', '0')) - 1)

    return lis
