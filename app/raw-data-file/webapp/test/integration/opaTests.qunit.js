sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'cap/issue/rawdatafile/test/integration/FirstJourney',
		'cap/issue/rawdatafile/test/integration/pages/RawDataFileList',
		'cap/issue/rawdatafile/test/integration/pages/RawDataFileObjectPage'
    ],
    function(JourneyRunner, opaJourney, RawDataFileList, RawDataFileObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('cap/issue/rawdatafile') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRawDataFileList: RawDataFileList,
					onTheRawDataFileObjectPage: RawDataFileObjectPage
                }
            },
            opaJourney.run
        );
    }
);