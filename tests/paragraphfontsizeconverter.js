import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { getData as getViewData } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import FontSizeEditing from '@ckeditor/ckeditor5-font/src/fontsize/fontsizeediting';

import ParagraphFontSizeConverter from './../src/paragraphfontsizeconverter';
import { POINT_TO_PIXEL_MULTIPLICATOR } from './../src/utils';

describe( 'ParagraphFontSizeConverter', () => {
	let editor, model, doc;

	testUtils.createSinonSandbox();

	afterEach( () => {
		if ( editor ) {
			return editor.destroy();
		}
	} );

	it( 'defines plugin name', () => {
		expect( ParagraphFontSizeConverter.pluginName ).to.equal( 'ParagraphFontSizeConverter' );
	} );

	describe( 'conversion', () => {
		beforeEach( () => {
			return VirtualTestEditor
				.create( {
					plugins: [ FontSizeEditing, Paragraph, ParagraphFontSizeConverter ],
					fontSize: {
						options: [ 6, 7, 8, 9, 10, 12, 13,
							14, 16, 18, 20, 22, 24,
							26, 28, 30, 32, 34, 36,
							38, 40, 42, 44, 46, 48,
							50, 52 ]
					},
				} )
				.then( newEditor => {
					editor = newEditor;
					model = editor.model;
					doc = model.document;
				} );
		} );

		it( 'should convert font-size in px', () => {
			editor.setData( '<p style="font-size:50px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.getChild( 0 ).hasAttribute( 'fontSize' ) ).to.be.true;
			expect( paragraph.getChild( 0 ).getAttribute( 'fontSize' ) ).to.equal( 50 );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p><span style="font-size:50px">foo</span></p>' );
		} );

		it( 'should convert font-size in pt', () => {
			editor.setData( '<p style="font-size:50pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const expectedValue = Math.round( 50 * POINT_TO_PIXEL_MULTIPLICATOR );

			expect( paragraph.getChild( 0 ).hasAttribute( 'fontSize' ) ).to.be.true;
			expect( paragraph.getChild( 0 ).getAttribute( 'fontSize' ) ).to.equal( expectedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p><span style="font-size:67px">foo</span></p>' );
		} );

		it( 'should convert all paragraph font-size in px', () => {
			const fontSizeOptions = editor.config._config.fontSize;

			const rawData = fontSizeOptions.options.map( fontsize => `<p style="font-size:${ fontsize }px;">foo</p>` )
				.join( '' );
			const renderedData = fontSizeOptions.options.map( fontsize => `<p><span style="font-size:${ fontsize }px;">foo</span></p>` )
				.join( '' );
			const viewData = fontSizeOptions.options.map( fontsize => `<p><span style="font-size:${ fontsize }px">foo</span></p>` )
				.join( '' );

			editor.setData( rawData );

			expect( editor.getData() ).to.equal( renderedData );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( viewData );
		} );

		it( 'should convert all paragraph font-size in pt', () => {
			const fontSizeOptions = editor.config._config.fontSize;

			const rawData = fontSizeOptions.options.map( fontsize => `<p style="font-size:${ fontsize }pt;">foo</p>` )
				.join( '' );
			const dataInPixels = fontSizeOptions.options.map( fontsize => {
				return `<p><span style="font-size:${ Math.round( fontsize * POINT_TO_PIXEL_MULTIPLICATOR ) }px;">foo</span></p>`;
			} ).join( '' );
			const dataViewInPixels = fontSizeOptions.options.map( fontsize => {
				return `<p><span style="font-size:${ Math.round( fontsize * POINT_TO_PIXEL_MULTIPLICATOR ) }px">foo</span></p>`;
			} ).join( '' );

			editor.setData( rawData );

			expect( editor.getData() ).to.equal( dataInPixels );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( dataViewInPixels );
		} );
	} );
} );
