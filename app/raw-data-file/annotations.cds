using CatalogService as service from '../../srv/cat-service';

annotate service.RawDataFile with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: content,
    },
    {
        $Type: 'UI.DataField',
        Value: createdAt,
    },
]);
