import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

const getRoundedFontSize = fontSize => {
	switch ( true ) {
		case fontSize.indexOf( 'pt' ) > -1:
			fontSize = parseInt( fontSize.replace( 'pt', '' ) ) * ( 2 / 3 * 2 );
			break;
		case fontSize.indexOf( 'px' ) > -1:
			fontSize = parseInt( fontSize.replace( 'px', '' ) );
			break;
	}

	return Math.round( fontSize );
};

export default class SpanFontSizeConverter extends Plugin {
	static get pluginName() {
		return 'SpanFontSizeConverter';
	}

	init() {
		const editor = this.editor;

		editor.conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				styles: {
					'font-size': /[\s\S]+/
				}
			},
			model: {
				key: 'fontSize',
				value: viewElement => {
					const fontSize = viewElement.getStyle( 'font-size' );
					const value = getRoundedFontSize( fontSize );

					return value;
				}
			}
		} );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'fontSize',
			view: ( modelAttributeValue, viewWriter ) => viewWriter.createAttributeElement( 'span', {
				style: `font-size:${ modelAttributeValue }px`
			} )
		} );
	}
}
