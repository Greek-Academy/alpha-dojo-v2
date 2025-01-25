# alpha-dojo-linter

## API Reference

### POST `/lint`

Request:

```json
{
  "source_code": "string",
  "language_id": "typescript | python",
  "format": "default | json"
}
```

Response:

```json
{
  "stdout": "string",
  "stderr": "string",
  "exit_code": "number" // 0 for success
}
```

## setup and run app

### For docker

```
docker compose build

docker compose up -d
```

### other

- build error が発生

`FROM nikolaik/python-nodejs:python3.12-nodejs22-alpine`
↓
`FROM nikolaik/python-nodejs:latest`
で一旦回避
