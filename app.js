/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui';
import { Collection, Locale } from "@ckeditor/ckeditor5-utils/";
import { Model } from '@ckeditor/ckeditor5-engine';


const locale = new Locale(); 


const collection = new Collection();
collection.add ({
	type: 'button',
	model: new Model ({
		label: 'Button',
		withText: true,
		
	})
});

collection.add({
	type: 'button',
	label: 'Button 2',
	withText: true,
	model: new Model({
	})
});

collection.add({
	type: 'button',
	model: new Model({
		label: 'Button 3',
		withText: true,
	})
});

console.log({collection})

const listDropdown = createDropdown( locale );
listDropdown.buttonView.set( {
	label: 'Elements',
	withText: true,
} );

addListToDropdown(  listDropdown ,collection);
listDropdown.render();

document.getElementById ('dropdown-list').append( listDropdown.element);

//plugin Elements X TimeStamp /////////////////////////////////

// class Elements extends Plugin {
// 	init() {
// 		const editor = this.editor;
// 		editor.ui.componentFactory.add( 'elements', () => {
// 			// The button will be an instance of ButtonView.
// 			const button = new ButtonView();
// 			button.set( {
// 				label: 'Elements',
// 				withText: true
// 		} );
// 			//Execute a callback function when the button is clicked
// 			button.on( 'execute', () => {
// 				const now = 'Elements'
// 				console.log(button)
// 				//Change the model using the model writer
// 				editor.model.change( writer => {
// 					//Insert the text at the user's current position
// 					editor.model.insertContent( writer.createText( now.toString() ) );
// 				});
// 			});
// 			return button;
// 		} );
// 	}
// }

//plugin Elements X TimeStamp /////////////////////////////////

//plugin Elements ////////////////////////////////////////////

class Elements extends Plugin {
	init() {
		const editor = this.editor;
		// const locale = new Locale(); 
		editor.ui.componentFactory.add( 'elements', locale => {
			//create instance of DropDown
			const dropdown = createDropdown( locale );
			//create collection of elements
			const items = new Collection();
			// items.add({
			// 	type: 'button',
			// 		model: new Model( {
			// 			label: 'Location',
			// 			withText: false,
			// 		} ),
			// })

			//define elements for dropdown list
			const elementList = [
				{ type: 'button',
				label: 'Location123',
				withText: true,
				items: [
					{
							type: 'button',
							model: new Model({
									label: 'Subitem 1',
									withText: true,
							}),
					},
					// ... otros subelementos
			],
					// model: new Model( {
					// } ),
					 },
				{ type: 'button',
				label: 'Location2',
				withText: true,
					// model: new Model( {
					// } ),
					 },
				{ type: 'button',
				label: 'Location3',
				withText: true,
					// model: new Model( {
					// } ),
					 },
				// { label: 'Button 2', value: 'button2' },
				// { label: 'Button 3', value: 'button3' },
				// { label: 'Button 3', value: 'button3' },
				// { label: 'Button 3', value: 'button3' },
				// { label: 'Button 3', value: 'button3' },
			];

			//create ButtonView Elements and add to collection
			for( const element of elementList ) {
				
				const buttonModel = {
					label: element.label,
					withText: true,
				} ;
				console.log({element})

				const buttonView = new ButtonView( locale );
				buttonView.bind( 'label' ).to( buttonModel, 'label' );
				buttonView.bind( 'withText' ).to( buttonModel, 'withText' );
				buttonView.on( 'execute', () => {
					editor.model.change( writer => {
						editor.model.insertContent( writer.createText( element.value ) );
					} );
					
					dropdown.isOpen = false;
				} );

				items.add( {
					type: 'button',
					model: buttonModel,
					view: buttonView
					} );
			}

			addListToDropdown( dropdown, items );
			dropdown.buttonView.set( {
				label: 'Elements123',
				withText: true,
				tooltip: true,
			} );

			dropdown.render();
			return dropdown;
		} );
	}
}

//plugin Elements ////////////////////////////////////////////

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Essentials, Paragraph, Heading, List, Bold, Italic, Elements ],
		toolbar: [ 'bold', 'italic', '|', 'elements' ]
	} )
	.then( editor => {
		console.log( 'Editor was initialized', editor );
	} )
	.catch( error => {
		console.error( error.stack );
	} );