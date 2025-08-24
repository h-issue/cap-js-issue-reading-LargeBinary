sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'cap.issue.rawdatafile',
            componentId: 'RawDataFileObjectPage',
            contextPath: '/RawDataFile'
        },
        CustomPageDefinitions
    );
});