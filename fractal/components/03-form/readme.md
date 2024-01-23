# Form


| Option            |   value      |                                      |
|-------------------|--------------|--------------------------------------|
| method            | GET/POST     | HTTP method (default POST)           |
| csrf              | true/false   | add csrf input hidden (default true) |
| error             | true/false   | show errors message (default true)   |
| translator        | object       | config for translate                 |
| translator.prefix | property     | prefix translator                    |
| translator.t      | property     | function translate                   |

## Translator AdonisJS

```
{
  prefix: 'user.',
  t: (key) => t(key)
}


@jrmc.form({ translator: { prefix: 'user.', t: (key) => t(key) }})
  @jrmc.form.control({ name: 'name' })
    @!jrmc.form.input({ class: 'input-bordered' })
  @end
@end

=> exec i18n helper Adonis t('user.name')
```
