up:
	docker-compose up -d

stop:
	docker-compose stop

build:
	docker-compose up --build -d &&	chmod 777 code/dist/log/ code/dist/persistent/user/ code/dist/tmp/ code/dist/tenants/federal/gallery/img/

install:
	docker-compose run node sh -c 'npm install'

node-shell:
	docker-compose exec node bash

compile:
	docker-compose exec node npm run build:dev

log:
	docker-compose logs -f node

shell:
	docker-compose exec webserver bash

down:
	docker-compose down

test:
	cd tests && URL=http://webserver LOCAL=true python3 test.py

doc:
	docker-compose exec mkdocs mkdocs build

checkstyle:
	phpcs -s code/dist/

fixstyle:
	phpcbf code/dist/

phplint:
	docker run -it --rm overtrue/phplint:latest

composer-install:
	composer install

deploy-develop:
	php vendor/bin/dep deploy develop

deploy-production:
	php vendor/bin/dep deploy production

rollback:
	php vendor/bin/dep rollback production

update-po:
	find code/dist -name "*.php" -print0 | xargs -0 xgettext --sort-output --add-comments -o code/dist/lang/de/LC_MESSAGES/toBeAdded.po && cd code/dist/lang/de/LC_MESSAGES && msgmerge --update sharepicgenerator.po toBeAdded.po && rm toBeAdded.po

create-mo:
	cd  code/dist/lang/de/LC_MESSAGES && msgfmt sharepicgenerator.po --output-file=sharepicgenerator.mo

clean:
	rm code/dist/tmp/* -rf

eslint:
	cd code && npx eslint build --ext .js,.jsx,.ts,.tsx
