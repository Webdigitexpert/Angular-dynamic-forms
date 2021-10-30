import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  DefaultTreeviewI18n,
  DropdownTreeviewComponent,
  TreeviewConfig,
  TreeviewI18n,
  TreeviewItem,
  TreeviewModule,
  TreeviewSelection,
  TreeItem
} from 'ngx-treeview';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss'],
  providers: [
    DropdownTreeviewComponent,
    {
      provide: TreeviewI18n,
      useValue: Object.assign(new DefaultTreeviewI18n(), {
        getText(selection: TreeviewSelection): string {
          if (selection.uncheckedItems.length === 0) {
            return 'Select Category';
          }

          switch (selection.checkedItems.length) {
            case 0:
              return 'Select Category';
            default:
              return `${selection.checkedItems.length} Category Selected`;
          }
        },
        getFilterNoItemsFoundText(): string {
          return 'No Category found';
        },
      }),
    },
  ],
})
export class SelectCategoriesComponent implements OnInit {
  @Input() setSelectedcategory: any;
  @Output() SelectedValue = new EventEmitter<any>();
  @Output() ChangedValue = new EventEmitter<any>();

  public allcategories: any;

  public buttonClass = 'btn-outline-secondary category-dropdown';
  public config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 200,
  });

  items: any;
  selectedCategories: any;
  unselectedCategories: any;

  constructor(private categoryService: CategoriesService) {
      
  }

  contains(a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    // debugger

    this.getallparentcategory();

    this.categoryService.categorySubject$.subscribe((res: any) => {
      this.getallparentcategory();
    });
  }

  getallparentcategory() {
    this.categoryService.getCategoriesParentChild().subscribe((categories) => {
      this.allcategories = categories.data;
      const newArrayOfObj = categories.data.map(
        ({
          categoryName: text,
          id: value,
          subCategory: children,
          ...rest
        }) => ({
          text,
          value,
          children,
          ...rest,
        })
      );

      var parentChildObj = [];
      newArrayOfObj.forEach((arrayOfObj) => {
        const childArrayOfObj = arrayOfObj.children.map(
          ({
            categoryName: text,
            id: value,
            subCategory: children,
            ...rest
          }) => ({
            text,
            value,
            children,
            ...rest,
          })
        );
        arrayOfObj.children = childArrayOfObj;
        arrayOfObj.collapsed = true;
        if (this.setSelectedcategory) {
          if (this.contains(this.setSelectedcategory, arrayOfObj.value)) {
            arrayOfObj.checked = true;
          } else {
            arrayOfObj.checked = false;
          }
        } else {
          arrayOfObj.checked = false;
        }

        arrayOfObj['children'].forEach((item) => {
          if (this.setSelectedcategory) {
            if (this.contains(this.setSelectedcategory, item.value)) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          } else {
            item.checked = false;
          }
        });

        parentChildObj.push(arrayOfObj);
      });
      this.items = this.getItems(parentChildObj);
    });
  }

  getItems(parentChildObj) {
    let itemsArray = [];
    parentChildObj.forEach((set) => {
      itemsArray.push(new TreeviewItem(set));
    });
    return itemsArray;
  }

  onSelectedChange(event: any) {
    this.SelectedValue.emit(event);
  }

  onFilterChange(value: any) {
    this.ChangedValue.emit(value);
  }

  getParent(data: any) {
    console.log(data.target.checked);
  }
  viewParents(data:any){
      console.log(data)
  }
}
