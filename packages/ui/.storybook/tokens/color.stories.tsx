import type { Meta, StoryObj } from '@storybook/react-vite';
import colors from 'tailwindcss/colors';

type ColorKey = keyof typeof colors;

const meta: Meta<{
  swatch: {
    name: string;
    colors: Record<string, string>;
  }[];
}> = {
  title: 'design/Color',
  argTypes: {},
  render: (args) => (
    <table className="w-full table-auto text-left text-foreground text-sm rtl:text-right">
      <thead className="bg-muted text-xs uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Swatch</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {args.swatch.map(({ name, colors }) => (
          <tr key={name} className="border-b bg-card">
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4">
              <div className="flex overflow-x-clip rounded-md border shadow">
                {Object.entries(colors).map(([name, value]) => {
                  //   const isHex = value.startsWith('#');
                  //   const style = window.getComputedStyle(document.body);
                  //   const variable = value.match(/var\(([^)]+)\)/)?.[1] ?? '';
                  //   const [h, s, l] =
                  //     style.getPropertyValue(variable).match(/\d+/g) ?? [];
                  //   const colorHSL = isHex
                  //     ? hexToHSL(value)
                  //     : `hsl(${h}, ${s}%, ${l}%)`;
                  //   const colorHex = isHex
                  //     ? value
                  //     : hslToHex(Number(h), Number(s), Number(l));
                  return (
                    <div key={name} className="flex w-full flex-col pb-2">
                      <div className="h-16 w-full" style={{ backgroundColor: value }} />
                      <p className="text-center font-semibold">{name}</p>
                      <p className="text-center text-xs">{value}</p>

                      {/* <p className="text-xs text-center opacity-70">
                        {variable}
                      </p> */}
                      {/* <p className="text-xs text-center">{colorHex}</p>
                      <p className="text-xs text-center">{colorHSL}</p> */}
                    </div>
                  );
                })}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

const functionalSwatch = [
  'foreground',
  'background',
  'primary',
  'secondary',
  'card',
  'accent',
  'muted',
  'popover',
  'destructive',
  'input',
  'border',
  'ring',
] as unknown as ColorKey[];

export const Functional: Story = {
  args: {
    swatch: Object.entries(colors)
      .filter((d) => functionalSwatch.includes(d[0] as ColorKey))
      .sort(
        ([a], [b]) =>
          functionalSwatch.indexOf(a as ColorKey) - functionalSwatch.indexOf(b as ColorKey),
      )
      .map(([name, colors]) => {
        return {
          name,
          colors: typeof colors === 'string' ? { [name]: colors } : colors,
        };
      }),
  },
};
export const Tailwind: Story = {
  args: {
    swatch: Object.entries(colors)
      .filter(
        (d) =>
          ![...functionalSwatch, 'inherit', 'current', 'transparent'].includes(
            d[0] as keyof typeof colors,
          ),
      )
      .map(([name, colors]) => {
        return {
          name,
          colors: typeof colors === 'string' ? { [name]: colors } : colors,
        };
      }),
  },
};
