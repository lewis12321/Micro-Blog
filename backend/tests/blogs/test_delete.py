import uuid

import requests

from blogs import domain


def test_delete():
    # Given
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}
    requests.post(f'https://{domain}/dev/api/blogs', json=payload)
    response = requests.get('https://18nldn6xj2.execute-api.eu-west-2.amazonaws.com/dev/api/blogs')
    value = next(filter(lambda i: i["title"] == payload["title"], list(response.json())))

    # When
    response = requests.delete(f'https://{domain}/dev/api/blogs/{value["id"]}')

    # Then
    assert response.status_code == 200
    assert requests.get(f'https://{domain}/dev/api/blogs/{value["id"]}').status_code == 404


def test_delete_not_found():
    # Given
    blog_id = uuid.uuid4()

    # When
    response = requests.delete(f'https://{domain}/dev/api/blogs/{blog_id}')

    # Then
    assert response.status_code == 404
