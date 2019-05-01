import uuid

import requests


def test_delete():
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}
    requests.post('https://18nldn6xj2.execute-api.eu-west-2.amazonaws.com/dev/api/blogs', json=payload)
    response = requests.get('https://18nldn6xj2.execute-api.eu-west-2.amazonaws.com/dev/api/blogs')
    value = next(filter(lambda i: i["title"] == payload["title"], list(response.json())))

    response = requests.delete(f'https://18nldn6xj2.execute-api.eu-west-2.amazonaws.com/dev/api/blogs/{value["id"]}')

    assert response.status_code == 200
    # assert requests.get(f'https://18nldn6xj2.execute-api.eu-west-2.amazonaws.com/dev/api/blogs/{value["id"]}').status_code == 404  # TODO
