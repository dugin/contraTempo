import { Component } from '@angular/core';
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { TagDetail } from '../tag-detail/tag-detail';
import { TagProvider } from '../../providers/tag';
import { TagModel } from '../../model/tag';
/*
  Generated class for the Tag page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tag',
  templateUrl: 'tag.html'
})


export class Tag {

  tags = new Array<TagModel>();

  constructor(public alertCtrl: AlertController, public tagProvider: TagProvider, public modalCtrl: ModalController, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('Hello Tag Page');
    this.getAllTags();
  }

  tagSelected(tag: TagModel) {

    this.close(tag);

  }

  editTag(tag: TagModel, index: number) {

    this.presentModal(tag, index);

  }

  addTag() {

    this.presentModal();

  }

  private update(tag: TagModel, index: number) {


    this.tagProvider.update(tag).then(data => {

      this.updateDeleteFromArray(index, tag);


    }).catch(err => {
      console.log(err);

    });
  }

  private presentModal(tag?: TagModel, i?: number) {


    let modal = this.modalCtrl.create(TagDetail, { tag: tag, index: i });
    modal.present();

    modal.onDidDismiss(data => {
     
      if (data != null)
        if (data.tag != null)
          data.index != null ? this.update(data.tag, data.index) : this.insertTagIntoDB(data.tag);





    });
  }



  close(param?) {

    this.viewCtrl.dismiss(param);

  }

  insertTagIntoDB(tag: TagModel) {

    this.tagProvider.insert(tag).then((data) => {

      tag.id = data.insertId;
      this.insertTagIntoArray(tag);

    }).catch(err => {
      console.log("insert: " + err);

    });



  }


  insertTagIntoArray(tag: TagModel) {

    this.tags.unshift(tag);

  }

  updateDeleteFromArray(index: number, tag?: TagModel) {

    tag != null ? this.tags.splice(index, 1, tag) : this.tags.splice(index, 1);


  }

  deleteTag(tag: TagModel, index: number) {

    this.showAlert(tag.name).then(shouldDelete => {

      if (shouldDelete) {


        this.tagProvider.delete(tag.id).then((d) => {

          this.updateDeleteFromArray(index);

        }).catch(err => {
          console.log("delete: " + err);

        });
        ;


      }

    })

  }


  getAllTags() {

    this.tagProvider.getAll().then((data) => {

      for (let x = 0; x < data.rows.length; x++)
        this.insertTagIntoArray(
          new TagModel(
            data.rows.item(x).name,
            data.rows.item(x).color,
            data.rows.item(x).id));
      
    })
  }

  showAlert(name: string): Promise<boolean> {

    let promise: Promise<string> = new Promise((resolve, reject) => {

      let prompt = this.alertCtrl.create({
        title: 'Exclusão',
        message: "Tem certeza que deseja excluir " + name + ' ?',
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              resolve(false);
            }
          },
          {
            text: 'Sim',
            handler: data => {
              resolve(true);
            }
          }
        ]
      });
      prompt.present();
    });

    return promise
  }



}
