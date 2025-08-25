using Textify.General.Data;

namespace Demos.Data
{
    public class CharWidthInfo
    {
        public char Character { get; }
        public int Width { get; }
        public CharWidthType Type { get; }

        public CharWidthInfo(char character, int width, CharWidthType type)
        {
            Character = character;
            Width = width;
            Type = type;
        }
    }
}
