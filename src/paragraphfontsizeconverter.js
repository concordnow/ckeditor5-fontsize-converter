import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { getRoundedFontSize } from './utils';

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

	for ( const value of data.modelRange.getWalker() ) {
		if ( value.type === 'text' && !value.item.getAttribute( 'fontSize' ) ) {
			writer.setAttribute( 'fontSize', fontSize, writer.createRangeOn( value.item ) );
		}
	}
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
	}
}
