import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class FontSizeConverter extends Plugin {
	static get pluginName() {
		return 'DowncastConverter';
	}

	init() {
		const editor = this.editor;

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'fontSize',
			view: ( modelAttributeValue, viewWriter ) => viewWriter.createAttributeElement( 'span', {
				style: `font-size:${ modelAttributeValue }px`
			} ),
			converterPriority: 'high'
		} );
	}
}
