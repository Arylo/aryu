import Table from 'cli-table'

export default function () {
  return new Table({
    chars: {
      'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
      'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
      'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
      'right': '' , 'right-mid': '' , 'middle': ' ',
    },
    style: {
      'padding-left': 2, 'padding-right': 0,
    },
  })
}
