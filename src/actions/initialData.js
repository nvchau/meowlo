export const initialData = {
  boards: [ // is a table in the database
    {
      id: 'board-1',
      columnOrder: ['column-1', 'column-2', 'column-3'], // used to sort the order of columns
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'To do column',
          cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 1',
              cover: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/273532713_3809905752566906_8965370667488582217_n.jpg?stp=c0.48.160.160a_dst-jpg_p160x160&_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_ohc=bxvPhu2tE0kAX9e6PCB&_nc_ht=scontent.fdad3-4.fna&oh=00_AT9g9X_rp_F9t7DR-RsA7iXuDIoStnPblnsp68dJCp6U0g&oe=62371028'
            },
            { id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 2', cover: null },
            { id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 3', cover: null },
            { id: 'card-4', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 4', cover: null },
            { id: 'card-5', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 5', cover: null },
            { id: 'card-6', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 6', cover: null },
            { id: 'card-7', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 7', cover: null }
          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'Inprogress column',
          cardOrder: ['card-11', 'card-9', 'card-10'],
          cards: [
            { id: 'card-8', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 8', cover: null },
            { id: 'card-9', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 9', cover: null },
            { id: 'card-10', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 10', cover: null }
          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Done column',
          cardOrder: ['card-11', 'card-12', 'card-13'],
          cards: [
            { id: 'card-11', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 11', cover: null },
            { id: 'card-12', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 12', cover: null },
            { id: 'card-13', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 13', cover: null }
          ]
        }
      ]
    }
  ]
}