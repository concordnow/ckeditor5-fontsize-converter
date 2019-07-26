import FontSizeConverter from './../src/fontsizeconverter';
import ParagraphFontSizeConverter from './../src/paragraphfontsizeconverter';

describe( 'FontSizeConverter', () => {
	it( 'requires ParagraphFontSizeConverter', () => {
		expect( FontSizeConverter.requires ).to.deep.equal( [ ParagraphFontSizeConverter ] );
	} );

	it( 'defines plugin name', () => {
		expect( FontSizeConverter.pluginName ).to.equal( 'FontSizeConverter' );
	} );
} );
