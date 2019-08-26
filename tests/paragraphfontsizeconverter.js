import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { getData as getViewData } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import ParagraphFontSizeConverter from './../src/paragraphfontsizeconverter';

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
			return createTestEditor()
				.then( newEditor => {
					editor = newEditor;
					model = editor.model;
					doc = model.document;
				} );
		} );

		it( 'should convert font-size in px', () => {
			editor.setData( '<p style="font-size:50px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'fontSize' ) ).to.be.true;
			expect( paragraph.getAttribute( 'fontSize' ) ).to.equal( 50 );

			expect( editor.getData() ).to.equal( '<p style="font-size:50px;">foo</p>' );
			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="font-size:50px">foo</p>' );
		} );

		it( 'should convert font-size in pt', () => {
			editor.setData( '<p style="font-size:50pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const expectedValue = Math.round( 50 * ( 2 / 3 * 2 ) );

			expect( paragraph.hasAttribute( 'fontSize' ) ).to.be.true;
			expect( paragraph.getAttribute( 'fontSize' ) ).to.equal( expectedValue );

			expect( editor.getData() ).to.equal( `<p style="font-size:${ expectedValue }px;">foo</p>` );
			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( `<p style="font-size:${ expectedValue }px">foo</p>` );
		} );
	} );

	function createTestEditor( extraConfig = {} ) {
		return VirtualTestEditor
			.create( Object.assign( {
				plugins: [ Paragraph, ParagraphFontSizeConverter ]
			}, extraConfig ) );
	}
} );
