function helloWorld() {
  Logger.log('Hello from Codex + GitHub Actions!');
}

function createEventSatisfactionForm() {
  const title = '活動滿意度調查';
  const description = [
    '感謝您參與本次活動！',
    '為了提供更好的體驗，請花幾分鐘填寫此份滿意度回饋表。'
  ].join('\n');

  const form = FormApp.create(title)
    .setDescription(description)
    .setCollectEmail(true)
    .setLimitOneResponsePerUser(true)
    .setProgressBar(true)
    .setShuffleQuestions(false)
    .setConfirmationMessage('感謝您的回饋，我們會持續優化活動內容！');

  form.addSectionHeaderItem().setTitle('參與者基本資料');

  form.addTextItem()
    .setTitle('姓名')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('參加的活動場次')
    .setChoiceValues([
      '開幕式',
      '主題工作坊',
      '成果展示',
      '閉幕茶會'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addDateItem()
    .setTitle('參與日期')
    .setRequired(true);

  form.addSectionHeaderItem().setTitle('活動滿意度');

  form.addScaleItem()
    .setTitle('整體滿意度')
    .setBounds(1, 5)
    .setLabels('非常不滿意', '非常滿意')
    .setRequired(true);

  form.addGridItem()
    .setTitle('請對以下項目評分')
    .setRows([
      '活動內容與議程',
      '講者表現',
      '現場服務與接待',
      '場地與設備'
    ])
    .setColumns(['1', '2', '3', '4', '5'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('您喜歡此次活動的哪些部分？（可複選）')
    .setChoiceValues([
      '議程安排',
      '互動交流',
      '活動贈品',
      '餐飲服務'
    ])
    .showOtherOption(true);

  form.addParagraphTextItem()
    .setTitle('有沒有想對主辦單位說的話或建議？');

  const editUrl = form.getEditUrl();
  const publishedUrl = form.getPublishedUrl();

  Logger.log('表單建立完成：');
  Logger.log(`編輯連結: ${editUrl}`);
  Logger.log(`回覆連結: ${publishedUrl}`);

  return {
    editUrl,
    publishedUrl,
    formId: form.getId()
  };
}
