# Redaktor Tools Reference

Complete list of all Redaktor tools with descriptions and usage examples.

English | [Русский](./TOOLS.ru.md)

## 📝 Text Tools

### 1. Remove Duplicates
**Description:** Remove duplicate lines from text
**Options:**
- Case Sensitive — compare with case sensitivity
- Trim Lines — trim whitespace before comparison
- Keep — keep first or last occurrence

**Example:**
```
Input:
apple
banana
apple

Output (Keep first):
apple
banana
```

### 2. Find & Replace
**Description:** Find and replace text with regex support
**Options:**
- Use Regex — enable regular expressions
- Case Insensitive — ignore case
- Global — replace all occurrences

**Examples:**
```
Find: hello
Replace: hi
Input: hello world, hello everyone
Output: hi world, hi everyone

Find: \d+ (regex)
Replace: X
Input: I have 5 apples and 3 oranges
Output: I have X apples and X oranges
```

### 3. Change Case
**Description:** Convert text to different cases
**Variants:**
- UPPERCASE
- lowercase
- Title Case
- Sentence case
- camelCase
- snake_case
- kebab-case
- CONSTANT_CASE

**Examples:**
```
Input: hello world
UPPERCASE: HELLO WORLD
camelCase: helloWorld
snake_case: hello_world
CONSTANT_CASE: HELLO_WORLD
```

### 4. Sort Lines
**Description:** Sort text lines
**Options:**
- Order: A-Z, Z-A
- By: Alphabetically, Length, Natural, Random, Reverse

**Example:**
```
Input:
dog
apple
cat

Output (A-Z):
apple
cat
dog
```

### 5. Extract Emails
**Description:** Extract all email addresses from text
**Options:**
- Unique only — show only unique emails

**Example:**
```
Input: Contact me at john@example.com or jane@site.org
Output:
john@example.com
jane@site.org
```

### 6. Extract URLs
**Description:** Extract all URLs from text
**Options:**
- Unique only

**Example:**
```
Input: Visit https://example.com or https://google.com
Output:
https://example.com
https://google.com
```

### 7. Remove Empty Lines
**Description:** Remove empty and whitespace-only lines
**Options:**
- Trim whitespace

### 8. Trim Lines
**Description:** Remove leading and trailing whitespace from each line

### 9. Text Statistics
**Description:** Get comprehensive text analysis

**Metrics:**
- Characters (with and without spaces)
- Words, Lines, Sentences, Paragraphs
- Bytes, Unique words
- Average word/line length

### 10. Base64 Encode/Decode
**Description:** Encode/decode Base64
**Examples:**
```
Input: Hello World
Base64: SGVsbG8gV29ybGQ=

Input: SGVsbG8gV29ybGQ=
Decoded: Hello World
```

### 11. URL Encode/Decode
**Description:** URL-safe string encoding/decoding
**Examples:**
```
Input: hello world!
Encoded: hello%20world%21

Input: hello%20world%21
Decoded: hello world!
```

### 12. Escape / Unescape
**Description:** Escape special characters
**Types:**
- HTML (< > & " ')
- JSON (\n \t \" \\)
- SQL (single quotes)
- Regex (special characters)

**Examples:**
```
Input: <div>Hello</div>
HTML Escaped: &lt;div&gt;Hello&lt;/div&gt;

Input: {"name": "John"}
JSON Escaped: {\"name\": \"John\"}
```

### 13. Hash Generator
**Description:** Generate cryptographic hashes
**Algorithms:**
- SHA-1
- SHA-256
- SHA-512

**Example:**
```
Input: hello
SHA-256: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

### 14. UUID / ULID Generator
**Description:** Generate unique identifiers
**Types:**
- UUID v4 (standard)
- ULID (time-sortable)
- NanoID (compact)

**Examples:**
```
UUID v4: 123e4567-e89b-12d3-a456-426614174000
ULID: 01ARZ3NDEKTSV4RRFFQ69G5FAV
NanoID: V1StGXR_Z5j3eK4UKa6
```

### 15. Random String
**Description:** Generate random strings
**Options:**
- Length (1-512)
- Count (1-100)
- Charset: Alpha, Alphanumeric, Numeric, Special

**Example:**
```
Length: 16, Charset: Alphanumeric
Output: aB3xY9pQmK7nWz1R
```

### 16. Password Strength
**Description:** Check password strength
**Criteria:**
- Length (8, 12, 16+ characters)
- Uppercase letters
- Lowercase letters
- Numbers
- Special characters

**Results:**
- Weak
- Fair
- Good
- Strong
- Very Strong

### 17. Caesar Cipher
**Description:** Shift cipher encoding/decoding
**Parameters:**
- Shift (0-25)

**Example:**
```
Input: hello
Shift: 3
Output: khoor
```

### 18. Morse Code
**Description:** Encode/decode Morse code
**Examples:**
```
Input: hello
Output: .... . .-.. .-.. ---

Input: .... . .-.. .-.. ---
Output: hello
```

### 19. Lorem Ipsum
**Description:** Generate Lorem Ipsum placeholder text
**Types:**
- Words
- Sentences
- Paragraphs

---

## 📊 CSV / TSV Tools

### 1. CSV to JSON
**Description:** Convert CSV to JSON format
**Options:**
- Delimiter: , ; \t | custom
- Pretty print

**Example:**
```
CSV Input:
name,age
Alice,30
Bob,25

JSON Output:
[
  {"name": "Alice", "age": "30"},
  {"name": "Bob", "age": "25"}
]
```

### 2. JSON to CSV
**Description:** Convert JSON array to CSV
**Options:**
- Delimiter

**Example:**
```
JSON Input:
[
  {"id": 1, "name": "Alice"},
  {"id": 2, "name": "Bob"}
]

CSV Output:
id,name
1,Alice
2,Bob
```

---

## 🔗 JSON / YAML / XML Tools

### 1. JSON Formatter
**Description:** Format and minify JSON
**Options:**
- Indent: 2, 4, tab
- Sort keys
- Minify

**Examples:**
```
Pretty:
{
  "name": "John",
  "age": 30
}

Minified:
{"name":"John","age":30}
```

### 2. JSON Validator
**Description:** Check JSON syntax validity
**Results:**
- Valid/Invalid status
- Error message with position

---

## 🔧 Utility Tools

### 1. Regex Tester
**Description:** Test regular expressions with live preview
**Results:**
- All matches
- Capture groups
- Match indices

### 2. Color Picker
**Description:** Convert between color formats
**Formats:**
- HEX: #FF5733
- RGB: rgb(255, 87, 51)
- HSL: hsl(10, 100%, 60%)
- RGBA: rgba(255, 87, 51, 1)
- HSLA: hsla(10, 100%, 60%, 1)

---

## 💡 Tips & Tricks

### 1. Regex Patterns
```
Multiple spaces: \s+
Replace with single space: (space)

Email pattern: [a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}

Date pattern: \d{4}-\d{2}-\d{2}
```

### 2. CSV Processing
- Automatic delimiter detection
- Support for quoted values
- Escape special characters

### 3. JSON Work
- Key sorting for readability
- Validation before API calls
- Formatting for documentation

### 4. Password Security
- Minimum 12 characters recommended
- Mix uppercase, lowercase, numbers, symbols
- Avoid dictionary words

---

## 📈 Workflow Examples

### Clean Contact List
1. Copy list to **Text Input**
2. Use **Extract Emails** with `Unique only`
3. Use **Sort Lines** to organize
4. Use **Remove Duplicates** if needed
5. Download or copy results

### Transform Data
1. Load CSV file
2. Use **CSV to JSON**
3. Edit in **JSON Formatter**
4. Use **JSON to CSV** to return

### Generate Test Data
1. Use **Lorem Ipsum** for text
2. Use **UUID Generator** for IDs
3. Use **Random String** for passwords
4. Copy into your application

---

**Need another tool?** [Open an issue on GitHub](https://github.com/yourusername/redaktor/issues)!
