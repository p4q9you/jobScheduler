
[**仕様**]

## UI
- ヘッダー（基準日）固定
- 
## 初期処理

- 処理日を自動入力
- 処理日を元に日付と曜日を表として生成
- 休日祝日列の色変え
- 入力しておいた基準日とJSONの計算式から表にマッピング

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/1.3.7/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/1.3.7/css/jquery.jexcel.css" type="text/css" />
```

You should initiate your table based on a div container, such as:
```html
<div id="mytable"></div>
```

To initialize a jExcel table you should run a javascript, such as:
```javascript
data = [
    ['Google', 1998, 807.80],
    ['Apple', 1976, 116.52],
    ['Yahoo', 1994, 38.66],
];

$('#mytable').jexcel({ data:data, colWidths: [ 300, 80, 100 ] });
```

## Examples

- [Creating a table from an external CSV file](https://bossanova.uk/jexcel/examples/creating-a-table-from-an-external-csv-file)
- [Calendar column type](https://bossanova.uk/jexcel/examples/using-a-calendar-column-type)
- [Sorting by column](https://bossanova.uk/jexcel/examples/reorder)
- [Multiple spreadsheets in the same page](https://bossanova.uk/jexcel/examples/multiple-spreadsheets-in-the-same-page)
- [Integrating a third party plugin into jExcel](https://bossanova.uk/jexcel/examples/integrating-a-third-party-plugin-into-your-spreadsheet)
- [Currency and masking numbers](https://bossanova.uk/jexcel/examples/currency-and-masking-numbers)
- [Working with dropdowns](https://bossanova.uk/jexcel/examples/working-with-dropdowns)
- [Handling events](https://bossanova.uk/jexcel/examples/tracking-changes-on-the-spreadsheet)
- [Including formulas on your spreadsheet](http://www.bossanova.uk/jexcel/examples/including-formulas-on-your-spreadsheet)
- [Remote updates](http://www.bossanova.uk/jexcel/examples/remote-updates)

## Official website
- [jExcel Official](https://bossanova.uk/jexcel)

## Screenshot
<p align="center">
<img src="https://bossanova.uk/templates/default/img/jexcel.gif" align="center" alt="jExcel | The javascript spreadsheet | jquery plugin"/>
</p>

## Community
- [GitHub](https://github.com/paulhodel/jexcel/issues)

## Limitations and roadmap
We are working hard to create a better plugin, but jExcel is under development. We would love to hear your ideas to make a better plugin. We are glad to say new features are coming every day, and we are currently working in features such as:

- Merged cells
- Multiple tabs
- Drag columns
- Big data (partial table loading)
- Pagination
- Online work collaboration

More suggestions are welcome. Please send your comments in our Github page.

## Copyright and license
jExcel is released under the [MIT license]. Copyrights belong to Paul Hodel <paul.hodel@gmail.com>
