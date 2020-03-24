# Fouler

This action checks use of foul words in a new PR or issue created or edited and optionally closes it.


## Inputs


### `github_token`

**Required** Your Github Token.


### `close_permission`

Permission to close PR or Issue if foul words found. Accepted values are - true or false. Default `false`.


### `message`

Message that will be displayed if foul words are found. Default `Use of foul words detected`.


## Example usage

`uses: Prateek93a/Fouler`  
`with:`  
   `github_token: ${{secrets.TOKEN}}`    
   `close_permission: true`  
   `message: Use of foul words detected`  
