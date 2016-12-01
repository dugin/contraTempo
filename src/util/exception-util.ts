import { TaskModel } from '../model/task'
import { TagModel } from '../model/tag'

export class ExceptionUtil {


    public static checkTask(task: TaskModel): string | boolean {

        if (task.name == null)
            return 'Tópico não preenchido';

        else if (task.subject == null)
            return 'Assunto não preenchido';

        else if (task.timestamp == null)
            return 'Date e hora não preenchida';

        else if (task.tag == null)
            return 'Tag não preenchida';



        else
            return true;
    }

    public static checkTag(tag: TagModel): string | boolean {

        if (tag.name == null)
            return 'Nome não preenchido';

        else if (tag.color == null)
            return 'Nenhuma cor selecionada';

        else
            return true;
    }

}