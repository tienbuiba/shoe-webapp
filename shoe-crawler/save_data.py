import json
import sqlalchemy as db

#connect to mysql db
engine = db.create_engine(url='mysql+pymysql://root:Admin123**@localhost:3306/shoes')
connection = engine.connect()
category_table = db.Table('categories', db.MetaData(), autoload=True, autoload_with=engine)
product_table = db.Table('products', db.MetaData(), autoload=True, autoload_with=engine)

def get_data_from_file(file):
    with open(file, 'r', encoding='UTF8') as raw_file:
        data = json.load(raw_file)
        raw_file.close()
    return data

def get_category_name_from_product(product):
    category = product['productset_group_name'].split('/')
    if len(category) > 1:
        return category[1]
    else:
        return category[0]

def get_list_category(products):
    list_category = []
    for product in products:
        category = get_category_name_from_product(product=product)
        if category not in list_category:
            list_category.append(category)
    return list_category

def save_categories(categories):
    for category in categories:
        query = db.insert(category_table).values(name=category)
        connection.execute(query)

def save_products(products):
    for product in products:
        category_name = get_category_name_from_product(product=product)
        category_record = db.select(category_table).where(category_table.columns.name == category_name)
        category_id = connection.execute(category_record).fetchone().id
        images = []
        for img in product['images']:
            images.append(img['base_url'])
        query = db.insert(product_table).values(
                name=product['name'], 
                category_id=category_id, 
                price_origin=product['price'],
                price_sell=product['price'],
                short_description=product['short_description'],
                long_description=product['description'],
                color=['red', 'blue', 'green', 'white'],
                size=[38, 39, 40, 41],
                images=images,
                status='AVAILABLE',
                sold=product['all_time_quantity_sold'],
                available=1000,
                rating_avg=product['rating_average'],
                review_count=product['review_count'])
        connection.execute(query)

if __name__ == '__main__':
    products = get_data_from_file('product.json')
    categories = get_list_category(products=products)
    save_categories(categories=categories)
    save_products(products=products)