.PHONY: start_api stop_api

start_api:
	@docker-compose --project-name="test" up -d --build

stop_api:
	@docker-compose --project-name="test" down

whatsrunning:
	@docker ps