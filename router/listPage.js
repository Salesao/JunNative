import { InfoPost } from '../components/InformationPost/InfoPost';
import { Main } from '../components/Main';

//страницы приложения
export const pages = [
    {
        name:'posts',
        title:'Посты',
        component:Main
    },
    {
        name:'InfoPost',
        title:'Пост',
        component:InfoPost
    }
]