namespace my.bookshop;

using {
  cuid,
  managed
} from '@sap/cds/common';


entity RawDataFile : cuid, managed {
  @Core.MediaType                  : mediaType
  @Core.ContentDisposition.Filename: filename
  content   : LargeBinary @title: 'File';

  @Core.IsMediaType                : true
  mediaType : String      @title: 'Media Type';
  filename  : String      @title: 'Filename';
  size      : Integer     @title: 'Size';
  jetType   : String      @title: 'Type';
  status    : String      @title: 'Status' default 'new';
}

entity Books {
  key ID    : Integer;
      title : String;
      stock : Integer;
}
