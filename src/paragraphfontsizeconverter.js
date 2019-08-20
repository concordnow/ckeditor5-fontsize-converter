import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class ParagraphFontSizeConverter extends Plugin {
	static get pluginName() {
		return 'ParagraphFontSizeConverter';
	}

	static upcastFontSize() {
		return dispatcher => {
			dispatcher.on( 'element:p', ( evt, data, conversionApi ) => {
				const { consumable, writer } = conversionApi;
				const { modelRange, viewItem } = data;

				if ( !consumable.consume( viewItem, { style: 'font-size' } ) ) {
					return;
				}

				let fontSize = viewItem.getStyle( 'font-size' );

				if ( !fontSize || !modelRange ) {
					return;
				}

				fontSize = Math.round( parseInt( fontSize.replace( 'pt', '' ) ) * ( 2 / 3 * 2 ) );

				writer.setAttribute( 'fontSize', fontSize, modelRange );

				for ( const value of modelRange.getWalker() ) {
					const item = value.item;
					if ( !item.getStyle ) {
						continue;
					}

					let itemFontSize = item.getStyle( 'font-size' );

					if ( !itemFontSize ) {
						continue;
					}

					itemFontSize = Math.round( parseInt( itemFontSize.replace( 'pt', '' ) ) * ( 2 / 3 * 2 ) );

					writer.setAttribute( 'fontSize', itemFontSize, item );
				}
			} );
		};
	}

	init() {
		const editor = this.editor;

		editor.conversion.for( 'upcast' ).add( this.constructor.upcastFontSize() );
		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'fontSize',
			view: ( modelAttributeValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', {
					style: 'font-size: ' + modelAttributeValue + 'px'
				} );
			}
		} );
	}
}
