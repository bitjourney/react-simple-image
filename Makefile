VERSION="v`cat package.json | grep '"version":' | cut -d':' -f2 | sed -e 's/[",[:space:]]//g'`"

publish:
	@npm publish
	@git tag -a "${VERSION}" -m "tagged for ${VERSION}"
	@git push --tags

