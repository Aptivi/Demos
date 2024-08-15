using Nettify.EnglishDictionary;
using System.Threading.Tasks;

namespace Demos.Data
{
	public class WordService
	{
		public async Task<DictionaryWord[]> GetDefinition(WordSettings wordSettings) =>
			await DictionaryManager.GetWordInfoAsync(wordSettings.SelectedWord);
	}
}
