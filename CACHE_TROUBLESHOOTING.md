# 🔄 Якщо бачите помилку "Popup window closed"

Це означає що ваш браузер завантажив **старий закешований код**. 

## ✅ Швидке вирішення (30 секунд):

### Варіант 1: Hard Refresh (Найшвидший)
**Windows/Linux:**
- Натисніть `Ctrl + Shift + R`
- АБО `Ctrl + F5`

**Mac:**
- Натисніть `Cmd + Shift + R`

### Варіант 2: Очистка кешу браузера

**Chrome/Edge/Brave:**
1. Натисніть `Ctrl + Shift + Delete` (Windows) або `Cmd + Shift + Delete` (Mac)
2. Оберіть "Cached images and files" (зняти галочки з інших)
3. Time range: "Last hour" або "All time"
4. Натисніть "Clear data"
5. Закрийте і відкрийте вкладку

**Firefox:**
1. Натисніть `Ctrl + Shift + Delete`
2. Оберіть "Cache"
3. Time range: "Everything"
4. Натисніть "Clear Now"
5. Закрийте і відкрийте вкладку

### Варіант 3: Incognito/Private режим
1. Відкрийте нове приватне вікно:
   - Chrome/Edge: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`
2. Перейдіть на https://slaventiysvat.github.io/cvfactory/
3. Увійдіть і спробуйте "Enable Drive Sync"

### Варіант 4: DevTools Hard Reload
1. Відкрийте DevTools: `F12`
2. **Клікніть ПРАВОЮ кнопкою** на кнопку Reload/Refresh
3. Оберіть **"Empty Cache and Hard Reload"**
4. Закрийте DevTools

## 🔍 Як перевірити що новий код завантажився?

Відкрийте консоль (`F12` → вкладка Console) і подивіться:

**✅ Має бути:**
```
auth-manager.js loaded - Version 2026-02-08-001 (REDIRECT FLOW)
=== CV Factory Loading ===
Page loaded, checking for Firebase...
If you see popup errors, clear browser cache: Ctrl+Shift+Delete
```

**❌ НЕ має бути:**
```
Popup window closed
accounts.google.com/gsi/client
```

## 🎯 Тестування Drive Sync

Після очищення кешу:

1. Увійдіть через "Sign in with Google"
2. Натисніть "Enable Drive Sync"
3. **Сторінка має ПЕРЕНАПРАВИТИ на Google** (не popup!)
4. Дозвольте доступ
5. Автоматично повернетесь з "✓ Drive Sync Enabled"

## ⚠️ Якщо все ще не працює

1. Перевірте версію в консолі (має бути 2026-02-08-001)
2. Якщо бачите стару версію - спробуйте Incognito mode
3. Якщо Incognito працює - видаліть дані сайту:
   - Chrome: Settings → Privacy → Site settings → View permissions and data → 
     Find slaventiysvat.github.io → Delete
   - Firefox: Options → Privacy → Cookies and Site Data → Manage Data → 
     Find slaventiysvat.github.io → Remove

---

**Якщо нічого не допомагає** - напишіть мені що бачите в консолі (F12)!
