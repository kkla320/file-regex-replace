# File-Regex-Replace

## Parameters

| Name        | Required  | Default Value | Description   |
| ----------- | --------- | ------------- | ------------- |
|regex        | True      | -             | The regex you want to search for. |
|replacement  | True      | -             | The replacement string. Note that you could use captured groups in above regex to do replacement. |
|flags        | False     | `g`           | regex flags in javascript, see [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags) |
|include      | False     | `.*`          | Filter out which files to be modified, this should be a regex. Note that match is checked on full path, any part of the path match will be modified. You may use `^path/to/file` to filter from the beginning of the files' path. <br/> By default, it matches every file.|
|exclude      | False     | `.^`          | Same as include. By default, it matches nothing. |
|encoding     | False     | `utf8`        | String encodings for files. By default, it uses UTF-8 |
|path         | False     | `.`           | Path you want to start walk with. By default, it starts from `.`(the root of the repo) |

## Example

[Example action file](https://github.com/mingjun97/file-regex-replace/blob/master/example.yml)

```yml
    - name: Modify version number
      uses: mingjun97/file-regex-replace
      with:
        regex: '"version": "([0-9\.]*)",'
        replacement: '"version": "$1-test",'
        flags: "g"                  # Optional, defaults to "g"
        include: 'package\.json'    # Optional, defaults to ".*"
        exclude: '.^'               # Optional, defaults to '.^'
        encoding: 'utf8'            # Optional, defaults to 'utf8'
        path: '.'                   # Optional, defaults to '.'
``` 
   
## Why Build This

  I build this Github Action to help build a nightly release to make the workflow could automaticly append a string `-nightly` after the version number recorded in `package.json`.
  
  There is no other existing workflow could meet my requirements as far as I searched. [jacobtomlinson/gha-find-replace](https://github.com/jacobtomlinson/gha-find-replace), which I borrowed ideas from, works well but it only supports linux platform. Thus my nightly build workflow could not work for multiple platform.