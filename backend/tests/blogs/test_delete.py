import uuid

import requests

from blogs import base_url


def test_delete():
    # Given
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}
    requests.post(f'{base_url}/api/blogs', json=payload)
    response = requests.get(f'{base_url}/api/blogs')
    value = next(filter(lambda i: i["title"] == payload["title"], list(response.json())))

    # When
    response = requests.delete(f'{base_url}/api/blogs/{value["id"]}')

    # Then
    assert response.status_code == 200
    assert requests.get(f'{base_url}/api/blogs/{value["id"]}').status_code == 404
