.PHONY: start_api stop_api

start_api:
	@docker-compose --project-name="newspayper" up -d --build

start_api_attached:
	@docker-compose --project-name="newspayper" up --build

stop_api:
	@docker-compose --project-name="newspayper" down

whatsrunning:
	@docker ps