import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { CampsiteBlock, CampsiteBlockComponent } from '../../definitions/CampsiteBlock';
import { ArrayField } from '../../fields/array-field';
import { CampsiteService } from '../../services/campsite.service';

export class ListBlock extends CampsiteBlock {
  group = 'Core';
  name = 'Blocks';
  id = 'blockList';
  fields = {
    allowed: new ArrayField<{
      details: CampsiteBlock
    }>().default([]),
    blocks: new ArrayField<{
      type: string,
      data: any
    }>().default([])
  };
  component = ListBlockComponent;

  allowed(blocks: CampsiteBlock[]) {
    this.fields.allowed.data.set(blocks.map((x) => {
      return {
        details: x
      }
    }));
    return this;
  }

  linked!: ListBlockComponent;

  override export() {
    const data: any = {
      allowed: this.fields.allowed.data.value,
      blocks: []
    };

    if (!this.linked) return data;

    this.linked.editable.forEach((e) => {
      data.blocks.push({
        type: e.id,
        data: e.export()
      });
    })

    return data;
  }
}

@Component({
  selector: 'lib-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.scss']
})
export class ListBlockComponent extends CampsiteBlockComponent<ListBlock> implements OnInit {
  editable: CampsiteBlock[] = [];
  allowed: {
    details: CampsiteBlock;
  }[] = [];

  constructor(
    private campsite: CampsiteService
  ) {
    super();
  }

  ngOnInit() {
    this.block.linked = this;
    this.refresh(true);
  }

  refresh(force?: boolean) {
    const allowed = this.block.fields.blocks.data.value;
    this.allowed = this.block.fields.allowed.data.value;

    if (this.editable.length === allowed.length && !force) {
      return;
    }

    this.editable = [];

    allowed.forEach((element, i) => {
      const block = this.campsite.blocks.find((x) => x.id === element.type);
      const construct = (Object.getPrototypeOf(block).constructor);
      const editThis: CampsiteBlock = (new construct);
      if (!block) return;

      editThis.set(element.data);
      this.editable.push(editThis);
    });
  }

  async table(index?: number, type?: string) {
    if (index === undefined && type) {
      const block = this.campsite.blocks.find((x) => x.id === type);
      const construct = (Object.getPrototypeOf(block).constructor);
      const editThis: CampsiteBlock = (new construct);

      this.block.fields.blocks.data.set([
        ...this.block.fields.blocks.data.value,
        {
          type: type,
          data: editThis.export()
        }
      ])

      this.editable.push(editThis);
    } else if (index !== undefined) {
      if (!confirm('Remove ' + this.editable[index].name)) return;
      const array = this.block.fields.blocks.data.value;
      array.splice(index, 1);
      this.editable.splice(index, 1);
      this.block.fields.blocks.data.set(array);
    }

    requestAnimationFrame(() => this.refresh())
  }

  async move(index: number, dir: number) {
    const array = this.block.fields.blocks.data.value;
    const newArray = this.arrayMove(array, index, index + dir);
    this.editable = this.arrayMove(this.editable, index, index + dir);
    this.block.fields.blocks.data.set(newArray);

    requestAnimationFrame(() => this.refresh())
  }

  arrayMove(arr: any[], fromIndex: number, toIndex: number) {
    const array = [...arr]
    var element = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
    return array;
  }

  trackFunc(index: number, item: any) {
    return item.id;
  }
}
