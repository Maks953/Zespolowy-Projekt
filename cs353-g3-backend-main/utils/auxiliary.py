import random


def random_number_code(n=4):
    code = ''
    for i in range(n):
        code += str(random.randint(0, 9))
    return code
