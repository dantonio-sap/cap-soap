service LanguageService {
    entity Languages {
        sISOCode : String @title: 'ISO Code';
        sName    : String @title: 'Name';
    }

    entity LanguageName {
        sISOCode : String ;
        sName    : String;
    }
}

annotate LanguageService.Languages with @UI.LineItem  : [
    {Value: sISOCode},
    {Value: sName}
];