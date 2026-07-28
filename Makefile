.PHONY: dev build start docker-build docker-run init-db

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

docker-build:
	docker build -t personal-blog .

docker-run:
	docker run -p 3000:3000 personal-blog

init-db:
	npx prisma generate
	npx prisma db push
