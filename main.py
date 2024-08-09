# #variable
# a= 2

# #conditional
# if a==3 :
#     print(3)
# else:
#     print(a)

# if True | False:
#     print('true or false')


# #loop
# for i in range(1,5):
#     print(i)


# #array 
# array = [1,2,3,4]
# print(array[0])

# #class
# class A:
#     def genre():
#         print('jazz')
#     def name():
#         print('singer')
# A.genre()

# #function
# def sayHello():
#     print("Hello world!")

# sayHello()

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()


#---------------fastApi basic------------------
# class Item(BaseModel):
#     id:int
#     content:str

# items = ['맥북','애플워치','아이폰','에어팟']

# @app.get("/items")
# def read_items():
#     return items

# @app.get('/items/{id}')
# def read_id_item(id):
#     return items[int(id)]

# #쿼리형
# @app.get("/items")
# def read_item(skip:int=0,limit:int = 0):
#     return items[skip:skip+limit]

# @app.post("/items")
# def post_item(item:Item):
#     items.append(item.content)
#     return '성공했습니다'
#------------------------------------------------

answer ='GHOST'

@app.get('/answer')
def get_answer():
    return answer

app.mount("/wordle", StaticFiles(directory="wordale/static",html=True), name="static")

