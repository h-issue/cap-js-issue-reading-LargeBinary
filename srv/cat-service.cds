using my.bookshop as my from '../db/schema';

@requires: 'authenticated-user'
service CatalogService {
    // @readonly
    entity Books       as projection on my.Books;
    entity RawDataFile as projection on my.RawDataFile;

    function test()          returns String;
    function startInterval() returns String;
    function stopInterval()  returns String;
}
