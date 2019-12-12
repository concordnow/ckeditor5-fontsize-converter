import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class FontSizeConverter extends Plugin {
	static get pluginName() {
		return 'FontSizeConverter';
	}

	init() {
		const editor = this.editor;
		editor.model.schema.extend( 'div', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <div> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
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

		editor.model.schema.extend( 'table', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <table> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			if ( context.endsWith( 'table' ) ) {
				return true;
			}
		} );

		// View-to-model converter converting a view <table> with all its attributes to the model.
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: 'table',
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( 'table', viewElement.getAttributes() );
			}
		} );

		// Model-to-view converter for the <table> element (attrbiutes are converted separately).
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'table',
			view: 'table'
		} );

		editor.model.schema.extend( 'td', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <td> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			if ( context.endsWith( 'td' ) ) {
				return true;
			}
		} );

		// View-to-model converter converting a view <td> with all its attributes to the model.
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: 'td',
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( 'td', viewElement.getAttributes() );
			}
		} );

		// Model-to-view converter for the <td> element (attrbiutes are converted separately).
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'td',
			view: 'td'
		} );

		editor.model.schema.extend( 'tr', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <tr> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			if ( context.endsWith( 'tr' ) ) {
				return true;
			}
		} );

		// View-to-model converter converting a view <tr> with all its attributes to the model.
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: 'tr',
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( 'tr', viewElement.getAttributes() );
			}
		} );

		// Model-to-view converter for the <tr> element (attrbiutes are converted separately).
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'tr',
			view: 'tr'
		} );

		editor.model.schema.extend( 'span', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <span> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			if ( context.endsWith( 'span' ) ) {
				return true;
			}
		} );

		// View-to-model converter converting a view <span> with all its attributes to the model.
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: 'span',
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( 'span', viewElement.getAttributes() );
			}
		} );

		// Model-to-view converter for the <span> element (attrbiutes are converted separately).
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'span',
			view: 'span'
		} );

		editor.model.schema.extend( 'p', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <p> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			if ( context.endsWith( 'p' ) ) {
				return true;
			}
		} );

		// View-to-model converter converting a view <p> with all its attributes to the model.
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

		editor.model.schema.extend( 'ol', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <p> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			if ( context.endsWith( 'ol' ) ) {
				return true;
			}
		} );

		// View-to-model converter converting a view <p> with all its attributes to the model.
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: 'ol',
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( 'ol', viewElement.getAttributes() );
			}
		} );

		// Model-to-view converter for the <p> element (attrbiutes are converted separately).
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'ol',
			view: 'ol'
		} );

		editor.model.schema.extend( 'ul', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Allow <p> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			if ( context.endsWith( 'ul' ) ) {
				return true;
			}
		} );

		// View-to-model converter converting a view <p> with all its attributes to the model.
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: 'ul',
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( 'ul', viewElement.getAttributes() );
			}
		} );

		// Model-to-view converter for the <p> element (attrbiutes are converted separately).
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'ul',
			view: 'ul'
		} );
	}
}
