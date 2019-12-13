import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class FontSizeConverter extends Plugin {
	static get pluginName() {
		return 'FontSizeConverter';
	}

	init() {
		const editor = this.editor;
		editor.model.schema.register( 'div', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		editor.model.schema.register( 'p', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <div> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			if ( context.endsWith( 'p' ) ) {
				return true;
			}
			if ( context.endsWith( 'div' ) ) {
				return true;
			}
		} );

		// View-to-model converter converting a view <div> with all its attributes to the model.
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: 'div',
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( 'div', viewElement.getAttributes() );
			}
		} );

		// Model-to-view converter for the <div> element (attrbiutes are converted separately).
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'div',
			view: 'div'
		} );

		editor.conversion.for( 'upcast' ).elementToElement( {
			view: 'p',
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( 'p', viewElement.getAttributes() );
			}
		} );

		// Model-to-view converter for the <p> element (attrbiutes are converted separately).
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'p',
			view: 'p'
		} );

		// Model-to-view converter for <div> attributes.
		// Note that a lower-level, event-based API is used here.
		editor.conversion.for( 'downcast' ).add( dispatcher => {
			dispatcher.on( 'attribute', ( evt, data, conversionApi ) => {
				const { item } = data;
				if ( item.name != 'p' && item.name != 'div' ) {
					return;
				}

				const viewWriter = conversionApi.writer;
				const viewDiv = conversionApi.mapper.toViewElement( item );

				// In the model-to-view conversion we convert changes.
				// An attribute can be added or removed or changed.
				// The below code handles all 3 cases.
				if ( data.attributeNewValue ) {
					viewWriter.setAttribute( data.attributeKey, data.attributeNewValue, viewDiv );
				} else {
					viewWriter.removeAttribute( data.attributeKey, viewDiv );
				}
			} );
		} );
	}
}
