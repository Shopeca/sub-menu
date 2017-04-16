# sub-menu
jQuery plugin for submenus

## Example Usage

### HTML

Just add a trigger (button) element with list selector in options data attribute. Targeted list will be hidden after initialization. 

```html
<span class="open-options" aria-hidden="true" data-options=".list2">Options</span>
<div class="option-list list2">
	<a href="http://test/id=7" selected="selected" title="Go to the option">Option 1</a>
	<a href="http://test/id=8" title="Go to the option">Option 2</a>
</div>
```

### jQuery

```js
$('.open-options').subMenu();
```

#### Options

You can define following options

Option name | Default value | Comment
--- | --- | ---
topCorrection | 10 | Value added to calculated top padding (dependent on list style)
openedClass | 'sub-menu-opened' | Class name added to the trigger (button) element
optionDataAttribute | 'options' | Data attribute name pointing to the list

#### Multiple instances

You can initialize plugin on multiple elements. Just pass jQuery result with several elements to the plugin.
