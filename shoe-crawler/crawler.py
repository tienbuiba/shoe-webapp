import requests
import json
import argparse
from tqdm import tqdm

parser = argparse.ArgumentParser()
parser.add_argument('--start', type=int, default=0)
parser.add_argument('--end', type=int, default=4)
parser.add_argument('--start_page', type=int, default=0)
parser.add_argument('--end_page', type=int, default=100)
args = parser.parse_args()

categories = {
    'giay-dep-nu': 1703,
    'giay-dep-nam': 1686,
}

api_get_id_product = 'https://tiki.vn/api/personalish/v1/blocks/listings?limit=48&include=advertisement&aggregations=2&trackity_id=3b437fb6-697c-366d-6f2b-9251936c2036&category={}&page={}&urlKey={}'

api_product = 'https://tiki.vn/api/v2/products/{}'
product_field = [
    'name', 'short_description', 'price',
    'rating_average', 'review_count', 'description', 'images',
    'productset_group_name', 'all_time_quantity_sold'
]

def get_list_id_product(url):
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36"
    })
    list_ids = []
    if response.status_code == 200:
        data = json.loads(response.text)['data']
        for sample in data:
            list_ids.append(sample['id'])

    return list_ids


def get_information_product(url):
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/100.0.4896.127 Safari/537.36 "
    })
    if response.status_code == 200:
        data = json.loads(response.text)
        item = {}
        for field in product_field:
            try:
                item[field] = data[field]
            except:
                pass
        return item

if __name__ == '__main__':
    list_key = list(categories.keys())
    list_item= []
    try:
        for i in range(args.start, args.end, 1):
            category_name = list_key[i]
            category_id = categories[category_name]
            for page_index in tqdm(range(args.start_page, args.end_page)):
                category_page_url = api_get_id_product.format(category_id,page_index, category_name)
                list_product_ids = get_list_id_product(category_page_url)
                if len(list_product_ids) > 0:
                    for product_id in list_product_ids:
                        product_url = api_product.format(product_id)
                        item = get_information_product(product_url)
                        list_item.append(item)
    except: 
        pass
    print(len(list_item))
    json_object = json.dumps(list_item)
    with open("product.json", "w", encoding='UTF8') as file: 
        file.write(json_object)
    file.close()