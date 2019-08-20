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

const setFontSize = ( data, conversionApi ) => {
	const { consumable, writer } = conversionApi;
	const { modelRange, viewItem } = data;

	if ( !consumable.consume( viewItem, { style: 'font-size' } ) ) {
		return;
	}

	let fontSize = viewItem.getStyle( 'font-size' );

	if ( !fontSize || !modelRange ) {
		return;
	}

	fontSize = getRoundedFontSize( fontSize );

	writer.setAttribute( 'fontSize', fontSize, modelRange );
};

export default class ParagraphFontSizeConverter extends Plugin {
	static get pluginName() {
		return 'ParagraphFontSizeConverter';
	}

	static upcastFontSize() {
		return dispatcher => {
			dispatcher.on( 'element:p', ( evt, data, conversionApi ) => {
				setFontSize( data, conversionApi );
			} );
		};
	}

	init() {
		const editor = this.editor;

		editor.conversion.for( 'upcast' ).add( this.constructor.upcastFontSize() );
		editor.conversion.for( 'downcast' ).attributeToAttribute( {
			model: 'fontSize',
			view: modelAttributeValue => {
				return {
					key: 'style',
					value: {
						'font-size': modelAttributeValue + 'px'
					}
				};
			}
		} );
	}
}
