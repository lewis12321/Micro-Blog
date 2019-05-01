import uuid

import requests


def test_get_all():
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}
    requests.post('https://18nldn6xj2.execute-api.eu-west-2.amazonaws.com/dev/api/blogs', json=payload)

    response = requests.get('https://18nldn6xj2.execute-api.eu-west-2.amazonaws.com/dev/api/blogs')

    assert response.status_code == 200
    value = next(filter(lambda i: i["title"] == payload["title"], list(response.json())))
    assert value["title"] == payload["title"]
    assert value["description"] == payload["description"]
    assert value["markdown"] == payload["markdown"]
