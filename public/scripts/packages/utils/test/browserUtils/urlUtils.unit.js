define(['utils/browserUtils/urlUtils'], function (urlUtils) {
    'use strict';

    describe('urlUtils', function () {

        describe('parseQueryParams', function () {

            it('should parse params if query starts with ?', function () {
                var queryString = '?foo=bar&hello=world';
                var parsedQuery = urlUtils.parseQueryParams(queryString);
                expect(parsedQuery).toEqual({foo: 'bar', hello: 'world'});
            });

            it('should parse params if query doesn not start with ?', function () {
                var queryString = 'foo=bar&hello=world';
                var parsedQuery = urlUtils.parseQueryParams(queryString);
                expect(parsedQuery).toEqual({foo: 'bar', hello: 'world'});
            });

        });

    });
});