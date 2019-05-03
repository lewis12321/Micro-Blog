import uuid

import requests

from blogs import base_url


def test_get():
    # Given
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}
    requests.post(f'{base_url}/api/blogs', json=payload)
    response = requests.get(f'{base_url}/api/blogs')
    value = next(filter(lambda i: i["title"] == payload["title"], list(response.json())))

    # When
    response = requests.get(f'{base_url}/api/blogs/{value["id"]}')

    # Then
    assert response.status_code == 200
    assert response.json()["title"] == value["title"]
    assert response.json()["description"] == value["description"]
    assert response.json()["markdown"] == value["markdown"]


def test_get_not_found():
    # Given
    blog_id = uuid.uuid4()

    # When
    response = requests.get(f'{base_url}/api/blogs/{blog_id}')

    # Then
    assert response.status_code == 404

