# caesar-cipher-cli-tool
caesar-cipher-cli-tool task

В случае проблем, напишите, пожалуйста, в Discord _Viktor#7903

1. Для установки зависимостей необходимо выполнить команду **npm -i**.
2. Для запуска приложения используйте команду **node index** указав следующие пааметры:
  - -a, --action. Обязательный параметр отвечающий за осуществляемое действие. encode - кодирование текста, decode - декодирование текста.
  - -s, --shift. Обязательный параметр отвечающий за сдвиг символов латинского алфавита. Может принимать отрицательные значения. Для ввода отрицательного значения используется симол "=" после параметра (-s=-1 или --shift=-1).
  - -i, --input. Параметр отвечающий за путь к файлу-источнику текста для шифрования. Не является обязательным. При отсутствии ввод осуществляется из консоли.
  - -o, --output. Параметр отвечающий за путь к файлу-приемнику текста для шифрования. Не является обязательным. При отсутствии вывод осуществляется в консоль.
3. Примеры:
  - node index -a encode --shift 1 --input plain.txt --output encoded.txt
  - node index -a encode --shift=-1 --input plain.txt --output encoded.txt
  - node index -a encode --shift=-1 --input plain.txt
  - node index -a encode --shift=-1 --output encoded.txt
  - node index -a encode -s 7 -i "./input.txt" -o "./output.txt"
  - node index -a encode -s=-7 -i "./input.txt" -o "./output.txt"
  - node index -a encode -s 7 -i "./input.txt"
  - node index -a encode -s 7 -o "./output.txt"
