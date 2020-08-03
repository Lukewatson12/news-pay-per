.PHONY: start_api stop_api

start_api:
	@docker-compose --project-name="newspayper" up -d --build

stop_api:
	@docker-compose --project-name="newspayper" down

whatsrunning:
	@docker ps